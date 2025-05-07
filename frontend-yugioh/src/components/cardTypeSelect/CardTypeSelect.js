import React, { useContext } from 'react';
import { CardsContext } from '../../contexts/CardsContext';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CardTypeSelect() {
  const { types, currentType, fetchByType } = useContext(CardsContext);

  const handle = (e) => {
    fetchByType(e.target.value);
  };

  return (
    <Box sx={{ mb: 2, mr: 2 }}>
      {/* o cardTypeSelect é um box que contém o select, que é o filtro de tipo de carta */}
      <FormControl variant="outlined" size="medium" sx={{ minWidth: 140 }}>
        <InputLabel sx={{ color: 'white', opacity: 0.5 }}>Tipo de Carta</InputLabel>
        <Select
          value={currentType}
          onChange={handle}
          label="Tipo de Carta"
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8B0000' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
          }}
        >
          {/* o menuItem é cada opção do select, e o value é o valor que será passado para a função fetchByType quando a opção for selecionada */}
          <MenuItem value="">
            <em>Qualquer</em>
          </MenuItem>
          {types.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
