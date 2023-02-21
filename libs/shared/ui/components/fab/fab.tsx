import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

interface ActionProps {
  icon: JSX.Element;
  name: string;
}

interface ActionsProps {
  actions: ActionProps[];
}

export const Fab = ({ actions }: ActionsProps) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, left: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions &&
        actions.map(({ name, icon }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            tooltipTitle={name}
            tooltipOpen
            tooltipPlacement={'right'}
          />
        ))}
    </SpeedDial>
  );
};
