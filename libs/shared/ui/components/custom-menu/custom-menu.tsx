import {FunctionComponent, MouseEvent, useState} from 'react';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {
  nameSpaces,
  TranslationKey,
  useTypedTranslation,
} from '@mega-dev-crm/features';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface CustomMenuProps {
  id: number;
  handleDelete: (id: number, setAnchorEl: Function) => void;
  handleEdit: (id: number, setAnchorEl: Function) => void;
  handleActivate?: (id: number, setAnchorEl: Function) => void;
  menuOptions: TranslationKey[];
}

export const CustomMenu: FunctionComponent<CustomMenuProps> = ({
  id,
  handleDelete,
  handleEdit,
  handleActivate,
  menuOptions,
}) => {
  const {t} = useTypedTranslation(nameSpaces.common);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted>
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              index === 0 && handleDelete(id, setAnchorEl);
              index === 1 && handleEdit(id, setAnchorEl);
              // index === 2 && handleActivate(id, setAnchorEl);
            }}>
            {t(option)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
