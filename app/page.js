"use client";
import {
  Box,
  Stack,
  Typography,
  Modal,
  TextField,
  Button,
  List,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { light } from "@mui/material/styles/createPalette";

const item = [
  "tomato",
  "potato",
  "onion",
  "garlic",
  "ginger",
  "carrot",
  "lettuce",
  "kale",
];

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    color1: createColor("#292727"),
  },
});

export default function Home() {
  // States
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [search, setSearch] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      flexDirection="column"
      bgcolor={"#111111"}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="400"
          bgcolor="#393433"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={3}
          borderRadius={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h5" color={"white"}>
            ADD ITEM
          </Typography>
          <Stack width={"100%"} direction={"row"} spacing={2}>
            <TextField
              padding={3}
              label="Item Name"
              variant="filled"
              style={{ minWidth: "400px" }}
              sx={{
                // Root class for the input field
                "& .MuiFilledInput-root": {
                  color: "white",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                },
                // Class for the label of the filled input field
                "& .MuiInputLabel-filled": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) => {
                setItemName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                );
              }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#292727",
              }}
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack
        bgcolor="#393433"
        padding={10}
        borderRadius={5}
        display={""}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        sx={{
          transform: "scale(0.6)",
        }}
      >
        <Typography variant="h1" fontWeight="medium" color="white">
          Inventory Management
        </Typography>

        <Box>
          <Box
            width="1000px"
            height="100px"
            bgcolor=""
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
            padding={4}
            margin={5}
          >
            <TextField
              label={"Search Item"}
              padding={3}
              variant="filled"
              style={{ minWidth: "400px" }}
              inputProps={{ style: { fontSize: 40 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              sx={{
                // Root class for the input field
                "& .MuiFilledInput-root": {
                  color: "white",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                },
                // Class for the label of the filled input field
                "& .MuiInputLabel-filled": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) => setSearch(e.target.value)}
            ></TextField>
            <Button
              style={{
                backgroundColor: "#292727",
                minWidth: "400px",
                minHeight: "100px",
              }}
              variant="contained"
              onClick={() => handleOpen()}
            >
              <Typography variant="h4">Add new item</Typography>
            </Button>
          </Box>

          <Stack
            id="PROBLEM"
            width="900px"
            height="400px"
            spacing={0}
            overflow="auto"
            sx={{
              // Center the Stack within its container
              margin: "0 auto",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {inventory
              .filter((name) => {
                return search.toLowerCase() === ""
                  ? name
                  : name.name.toLowerCase().includes(search);
              })
              .map(({ name, quantity }) => (
                <Box
                  key={name}
                  width={"100%"}
                  minHeight={"100px"}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  bgcolor="#57504C"
                  padding={5}
                  borderRadius={5}
                  border={"2px solid #000"}
                >
                  <Box
                    width="100%"
                    display={"flex"}
                    justifyContent={"space-between"}
                    padding={4}
                  >
                    <Typography variant="h3" color="white" textAlign="center">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="h3" color="white" textAlign="center">
                      {quantity}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#292727",
                    }}
                    display="flex"
                    onClick={() => {
                      removeItem(name);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
