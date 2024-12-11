





import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./component/home/Home"));

function App() {
  return (
    <div >
     <Suspense fallback={<div>Loading...</div>}>
     
     <Routes>
     <Route path="/" element={<Home />} />
     {/* <Route path="/Home" element={<Home />} /> */}
     </Routes>
   </Suspense>
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const App = () => {
//   const allFabrics = ["Cotton", "Silk", "Wool", "Linen", "Polyester"];
//   const [filterItem, setFilterItem] = useState(allFabrics); // List of fabrics to display
//   const [selectedFabricItem, setSelectedFabricItem] = useState(""); // The currently selected fabric
//   const [selectedItems, setSelectedItems] = useState([]); // Track all selected items

//   const handleChange = (e,) => {
//     // const selectedItem = e.target.value;
//     // console.log("sel",selectedItem)

//     // Filter out the selected item from the fabric list
//     const filteredList = filterItem.filter((fabric) => fabric !== selectedItem);
//     console.log("Selected Item:", selectedItem);
//     console.log("Filtered List:", filteredList);
    
//     // Update the filtered items and selected items
//     setFilterItem(filteredList); 
//     setSelectedItems([...selectedItems, selectedItem]); // Add the selected item to the selected list
    
//     // Clear the selected item so that the placeholder appears
//     setSelectedFabricItem("");
//   };

//   return (
//     <div>
//       <h1>Fabric Dropdown</h1>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel id="fabric-select-label">Select Fabric</InputLabel>
//         <Select
//           labelId="fabric-select-label"
//           // value={selectedFabricItem} 
//           onChange={handleChange}
//         >
//           {filterItem.map((fabric, index) => (
//             <MenuItem key={index} value={fabric}>
//               {fabric}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <h2>Selected Items</h2>
//       {selectedItems.length > 0 ? (
//         <ul>
//           {selectedItems.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No items selected yet.</p>
//       )}
//     </div>
//   );
// };

// export default App;