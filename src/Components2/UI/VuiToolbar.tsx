import { ViuCoreComponent } from "./Core/VuiCoreCompont";
import { VuiCameraToggleButton } from "./VuiCameraToggleButton";
import { VuiHangupButton } from "./VuiHangupButton";
import { VuiMicrophoneToggleButton } from "./VuiMicrophoneToggleButton";
import { VuiScreenshareToggleButton } from "./VuiScreenshareToggleButton";
import { useVuiTheme, VuiThemeSettings, VuiThemeStyle } from "./VuiTheme";

export interface VuiToolbarProps {
  style? : VuiThemeStyle;
  children?: string | JSX.Element | JSX.Element[];
}

export function VuiToolbar({ style, children }: VuiToolbarProps) {
  const theme = useVuiTheme();

  const element = !!children ? (
    children
  ) : (
    <>
      <VuiMicrophoneToggleButton></VuiMicrophoneToggleButton>
      <VuiCameraToggleButton></VuiCameraToggleButton>
      <VuiScreenshareToggleButton></VuiScreenshareToggleButton>
      <VuiHangupButton></VuiHangupButton>
    </>
  );

  return (
    <ViuCoreComponent base={theme.components.toolbar} hover={theme.components.toolbar} style={style}>
      {element}
    </ViuCoreComponent>
  );
}
