import { NextPage } from 'next';
import { Autocomplete, AutocompleteValue, Chip, TextField } from '@mui/material';

interface Props {
  options?: string[];
  value?: string[];
  onSave?: (
    event: React.SyntheticEvent,
    value: any
  ) => void;
}

const AutocompleteSizes: NextPage<Props> = ({ options = [], value = [], onSave = function() {} }) => {
  return (
    <Autocomplete
      multiple
      options={options || []}
      value={value || []}
      freeSolo
      selectOnFocus
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Sizes"
        />
      )}
      onChange={onSave}
    />
  )
}

export default AutocompleteSizes;
