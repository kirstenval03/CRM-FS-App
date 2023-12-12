import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, Box, FormControl, InputLabel, IconButton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

// Sample data
const initialRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', coach: 'Coach A', status: 'green' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', coach: 'Coach B', status: 'yellow' },
  // Add more customers as needed
];

const Customers = () => {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '', coach: '', status: 'green' });

  const handleStatusChange = (id, newStatus) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, status: newStatus };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleAddCustomer = () => {
    // Implement logic to add a new customer
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortData = (field) => {
    const sortedRows = [...rows].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const viewDetails = (id) => {
    // Implement logic to view details of the customer
    console.log('View details of customer with ID:', id);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddNewCustomer = () => {
    // Add validation or additional logic if needed
    setRows([...rows, { id: rows.length + 1, ...newCustomer }]);
    handleCloseDialog();
  };

  const handleNewCustomerChange = (field, value) => {
    setNewCustomer({ ...newCustomer, [field]: value });
  };

  const filteredRows = rows.filter(row => filter === '' || row.status === filter);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Button variant="contained" onClick={handleOpenDialog}>Add Customer</Button>
        <FormControl variant="outlined" size="small" style={{ width: '200px' }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            label="Filter by Status"
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="red">Red</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                First Name
                <IconButton size="small" onClick={() => sortData('firstName')}>
                  <SortIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell>
                Last Name
                <IconButton size="small" onClick={() => sortData('lastName')}>
                  <SortIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell>
                Coach
                <IconButton size="small" onClick={() => sortData('coach')}>
                  <SortIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.status }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.coach}</TableCell>
                <TableCell>
                  <Select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => viewDetails(row.id)}>See Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            margin="dense"
            value={newCustomer.firstName}
            onChange={(e) => handleNewCustomerChange('firstName', e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="dense"
            value={newCustomer.lastName}
            onChange={(e) => handleNewCustomerChange('lastName', e.target.value)}
          />
          <TextField
            label="Coach"
            fullWidth
            margin="dense"
            value={newCustomer.coach}
            onChange={(e) => handleNewCustomerChange('coach', e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newCustomer.status}
              label="Status"
              onChange={(e) => handleNewCustomerChange('status', e.target.value)}
            >
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddNewCustomer}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers;
