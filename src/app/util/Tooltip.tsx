import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

type MouseOverPopoverProps = {
  tooltip?: any,
  children?: any,
  style?: React.CSSProperties,
  extraClasses?: string,
  opacity?: number,
  forceOpen?: boolean,
  forceClose?: boolean,
  setForceOpen?: (value: boolean) => void,
  disableRestoreFocusParam?: boolean,
  forceXPlacement?: 'left' | 'right' | 'center', // Use appropriate types
  forceYPlacement?: 'top' | 'bottom' | 'center', // Use appropriate types
};

/**
 * MouseOverPopover provides the core implementation for the MouseOverPopover routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by MouseOverPopover.
 */
function MouseOverPopover({
  tooltip,
  children,
  style,
  extraClasses,
  opacity,
  forceOpen,
  forceClose,
  setForceOpen,
  disableRestoreFocusParam,
  forceXPlacement,
  forceYPlacement,
}: MouseOverPopoverProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [forceShow, setForceShow] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    if (!setForceOpen) {
      setAnchorEl(null);
    }
  };
  opacity = opacity ? opacity : 0.9;
  let open = !!setForceOpen ? forceOpen : Boolean(anchorEl);
  if(forceClose){
    open = false;
  }
  let currCords = 0;

  const [screenX, setScreenX] = useState(100);
  const [screenY, setScreenY] = useState(100);
  useEffect(() => {
    setScreenX(window.innerWidth);
    setScreenY(window.innerHeight);
  }, []);

  let xPlacement = "left";
  let yPlacement = "bottom";

  let xTransform = "left";
  let yTransform = "top";

  if (anchorEl) {
    currCords = anchorEl.getBoundingClientRect();
    if ((currCords as any).top / screenY > 0.5) {
      yPlacement = "top";
      yTransform = "bottom";
    }
  }

  if (forceXPlacement) {
    xPlacement = forceXPlacement;
  }
  if (forceYPlacement) {
    yPlacement = forceYPlacement;
    if (yPlacement === 'top') {
      yTransform = 'bottom';
    }
    if (yPlacement === 'bottom') {
      yTransform = 'top';
    }
  }

  return (
    <div
      className={
        extraClasses ? extraClasses + " popoverContainer" : "popoverContainer"
      }
      style={style ? style : {}}
    >
      <Typography
        // aria-owns={open ? 'mouse-over-popover' : undefined}
        component={"span"}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          width: '100%'
        }}
        open={open}
        anchorEl={anchorEl as any}
        anchorOrigin={{
          vertical: yPlacement,
          horizontal: xPlacement,
        } as any}
        transformOrigin={{
          vertical: yTransform,
          horizontal: xTransform,
        } as any}
        onClose={handlePopoverClose}
        // onMouseEnter={(e) => {
        //     setForceShow(true);
        // }}
        // oneMouseExit={(e) => {
        //     setForceShow(false);
        // }}
        // marginThreshold={1}
        // disableRestoreFocus
        // PaperProps={{
        //     onMouseEnter: handleMouseEnter,
        //     onMouseLeave: handleMouseLeave,
        //     sx: {
        //         pointerEvents: 'auto'
        //     }
        // }}
        slotProps={{
          paper: {
            style: {
              backgroundColor: `rgba(255,255,255,${opacity})`,
              padding: "6px",
              pointerEvents: "auto",
            },
            // onMouseEnter: (e) => {
            //     if (setForceOpen) {
            //         setForceOpen(true);
            //     }
            // },
            // onMouseLeave: (e) => {
            //     if (setForceOpen) {
            //         setForceOpen(false);
            //     }
            // },
            // sx: {
            //     pointerEvents: 'auto'
            // }
          },
        }}
        disableRestoreFocus={!!disableRestoreFocusParam ? disableRestoreFocusParam : true}
      >
        {tooltip}
      </Popover>
    </div>
  );
}

export default MouseOverPopover;
