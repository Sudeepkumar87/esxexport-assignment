import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import CloseIcon from "@mui/icons-material/Close";

const Form = () => {
  const allFabrics = ["Cotton", "Silk", "Wool", "Linen", "Polyester"];
  const [filterItem, setFilterItem] = useState(allFabrics);
  const [selectedFabricItem, setSelectedFabricItem] = useState([]);
  const [formValues, setFormValues] = useState({
    userName: "",
    NumerInput: "",
    chinaFabric: "",
    MajorFaric: "",
  });
  const [selectedPerPieceRequirment, setSelectedPerPieceRequirment] = useState([
    { pieceRequirement: "", color: "", id: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null); 

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.userName) formErrors.userName = "User Name is required.";
    if (!formValues.NumerInput) formErrors.NumerInput = "Number Input is required.";
    if (!formValues.chinaFabric) formErrors.chinaFabric = "Please select an option for China Fabric.";
    if (!formValues.MajorFaric) formErrors.MajorFaric = "Please select a Major Fabric.";
    
    selectedPerPieceRequirment.forEach((item, index) => {
      if (!item.pieceRequirement) formErrors[`pieceRequirement-${index}`] = "Piece Requirement is required.";
      if (!item.color) formErrors[`color-${index}`] = "Color is required.";
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePerPieceRequirment = (e, index) => {
    const { name, value } = e.target;
    setSelectedPerPieceRequirment((prevState) => {
      const updatedState = [...prevState];
      if (!updatedState[index]) {
        updatedState[index] = {}; 
      }
      updatedState[index][name] = value;
      return updatedState;
    });
  };

  const handleSelectFabricDropDown = (e, index) => {
    const selectedItem = e.target.value;

    if (filterItem.includes(selectedItem)) {
      let filteredList = filterItem.filter((fabric) => fabric !== selectedItem);
      setSelectedFabricItem((item) => [...item, selectedItem]);
      setFilterItem(filteredList);
    }
  };

  const handleRemoveFabric = (fabricItem) => {
    const removeList = selectedFabricItem.filter((item) => item !== fabricItem);
    setSelectedFabricItem(removeList);
    setFilterItem([...filterItem, fabricItem]);
  };

  const formHandleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
    
      const formData = {
        formValues,
        selectedFabricItem,
        selectedPerPieceRequirment,
      };
      setSubmittedData(formData); 
      console.log("Form Submitted", formData);
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <form onSubmit={formHandleSubmit}>
        <Typography sx={{ textAlign: "center", mb: 3 }}>
          T&A Data Submission Form
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker />
        </LocalizationProvider>
        <Box sx={{ marginTop: "1rem" }}>
          <TextField
            label="User Name"
            type="string"
            value={formValues.userName}
            onChange={(e) =>
              setFormValues({ ...formValues, userName: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            error={Boolean(errors.userName)}
            helperText={errors.userName}
          />
          <TextField
            label="Number Input"
            type="number"
            value={formValues.NumerInput}
            onChange={(e) =>
              setFormValues({ ...formValues, NumerInput: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            error={Boolean(errors.NumerInput)}
            helperText={errors.NumerInput}
          />
        </Box>
        <Box>
          <Typography variant="h6">Fabric Section</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="fabric-select-label">Select Fabric</InputLabel>
            <Select
              labelId="fabric-select-label"
              onChange={handleSelectFabricDropDown}
              value="" 
              error={selectedFabricItem.length === 0 && Boolean(errors.fabric)}
            >
              {filterItem.map((fabric, index) => (
                <MenuItem key={index} value={fabric}>
                  {fabric}
                </MenuItem>
              ))}
            </Select>
            {selectedFabricItem.length === 0 && (
              <FormHelperText error>{errors.fabric}</FormHelperText>
            )}
          </FormControl>
          {selectedFabricItem.map((fabric, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>{fabric}</Typography>
              <IconButton color="error" onClick={() => handleRemoveFabric(fabric)}>
                <CloseIcon />
              </IconButton>

              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  label="Per Piece Requirement"
                  name="pieceRequirement"
                  type="number"
                  value={selectedPerPieceRequirment[index]?.pieceRequirement || ''}
                  onChange={(e) => handlePerPieceRequirment(e, index)}
                  fullWidth
                  sx={{ mb: 1 }}
                  error={Boolean(errors[`pieceRequirement-${index}`])}
                  helperText={errors[`pieceRequirement-${index}`]}
                />
                <TextField
                  label="Color"
                  name="color"
                  type="string"
                  value={selectedPerPieceRequirment[index]?.color || ''}
                  onChange={(e) => handlePerPieceRequirment(e, index)}
                  fullWidth
                  error={Boolean(errors[`color-${index}`])}
                  helperText={errors[`color-${index}`]}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="china-fabric-label">Is there China Fabric?</InputLabel>
          <Select
            labelId="china-fabric-label"
            value={formValues.chinaFabric || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, chinaFabric: e.target.value })
            }
            error={Boolean(errors.chinaFabric)}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          {errors.chinaFabric && (
            <FormHelperText error>{errors.chinaFabric}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="major-fabric-label">Major Fabric</InputLabel>
          <Select
            labelId="major-fabric-label"
            value={formValues.MajorFaric || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, MajorFaric: e.target.value })
            }
            error={Boolean(errors.MajorFaric)}
          >
            <MenuItem value="None">None</MenuItem>
          </Select>
          {errors.MajorFaric && (
            <FormHelperText error>{errors.MajorFaric}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4254EA", color: "#fff", mt: 3 }}
        >
          Submit
        </Button>
      </form>

   
      {submittedData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Submitted Data:</Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default Form;


