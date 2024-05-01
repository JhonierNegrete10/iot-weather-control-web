import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const HistoricalDataTable = ({ data }) => {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

 const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const options = { timeZone: 'America/Bogota' };
      return date.toLocaleString('en-US', options);
  };
  
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table size="small" aria-label="historical data table">
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === 'created_at' ? orderDirection : false}>
              <TableSortLabel
                active={orderBy === 'created_at'}
                direction={orderBy === 'created_at' ? orderDirection : 'asc'}
                onClick={(event) => handleRequestSort(event, 'created_at')}
              >
                Fecha
                {orderBy === 'created_at' ? (
                  <Box component="span" sx={visuallyHidden}>
                    {orderDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Humidity 1</TableCell>
            <TableCell align="right">Humidity 2</TableCell>
            <TableCell align="right">Valve Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortData(data, getComparator(orderDirection, orderBy)).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {formatTimestamp(row.created_at)}
              </TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.humidity_1}</TableCell>
              <TableCell align="right">{row.humidity_2}</TableCell>
              <TableCell align="right">{row.valve_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoricalDataTable;
