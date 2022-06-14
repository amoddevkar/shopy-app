import React from "react";
import {
  Paper,
 
  Select,
  MenuItem,
  TextField,
  
  InputLabel,
  Typography,
 
  Button,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Sorting({
  onCategoryChange,
  category,
  onGteRatingsChange,
  gteRatings,
  onGtePriceChange,
  onLtePriceChange,
  onClear,
}) {
  return (
    <>
      <Accordion
        sx={{
          maxWidth: "200px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            fullWidth
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "inherit",
              bgcolor: "lightgreen",
            }}
          >
            Sort By:
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              borderRadius: "0",
              boxShadow: "0",
            }}
          >
            <InputLabel
              id="category"
              sx={{ mt: "10px", fontFamily: "inherit" }}
            >
              Category:
            </InputLabel>
            <Select
              labelId="category"
              value={category}
              onChange={onCategoryChange}
            >
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={"longsleeves"}
              >
                Long Sleeves
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={"shortsleeves"}
              >
                {" "}
                Short Sleeves
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={"sweatshirt"}
              >
                {" "}
                sweatshirt
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={"hoodies"}
              >
                {" "}
                hoodies
              </MenuItem>
            </Select>
            <InputLabel id="ratings" sx={{ mt: "10px", fontFamily: "inherit" }}>
              Ratings:
            </InputLabel>
            <Select
              labelId="ratings"
              value={gteRatings}
              onChange={onGteRatingsChange}
            >
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={1}
              >
                1 star
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={2}
              >
                2 star
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={3}
              >
                3 star
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={4}
              >
                4 star
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: "inherit",
                }}
                value={5}
              >
                5 star
              </MenuItem>
            </Select>
            <InputLabel sx={{ mt: "10px", fontFamily: "inherit" }}>
              Price less than:
            </InputLabel>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={onLtePriceChange}
            />{" "}
            <InputLabel sx={{ mt: "10px", fontFamily: "inherit" }}>
              Price greater than:
            </InputLabel>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={onGtePriceChange}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ my: "10px", borderRadius: "0", boxShadow: "0" }}
              onClick={onClear}
              color="success"
            >
              Clear sorting
            </Button>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
