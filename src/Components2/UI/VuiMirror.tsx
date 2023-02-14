import { ParticipantEvent, Track } from "livekit-client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

import { LocalView } from "../Core/LocalView";
import { ParticipantManager, useParticipant } from "../Core/ParticipantManager";
import { useCamera, useFocusView, useMicrophone, useRoom, useScreenshare } from "../Core/Room";
import { SourceVideo } from "../Core/SourceVideo";
import { videoSource } from "../schemas/videoSource";
import { VuiButton, VuiRoundButton } from "./Core/VuiButton";
import { ViuCoreComponent } from "./Core/VuiCoreCompont";
import { VuiToggleButton } from "./Core/VuiToggleButton";
import { VuiMultiview, VuiMultiviewProps } from "./VuiMultiview";

import { getComponentVariant, useVuiTheme, VuiThemeStyle } from "./VuiTheme";

export interface VuiMirrorProps {
  containerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  variant?: string;
  onClick?: () => void;
  mode?: "standard" | "multiview";
  multiviewSettings? : VuiMultiviewProps;
}
export function VuiMirror({ containerStyle, videoStyle, variant, onClick, mode = "standard", multiviewSettings }: VuiMirrorProps) {
  const theme = useVuiTheme();

  const themeNode = getComponentVariant(theme.components.mirror, variant);

  const style = {
    ...containerStyle,
  };

  return (
    <ViuCoreComponent base={themeNode} hover={themeNode._hover} style={style} onClick={onClick}>
      <LocalView>
        <>
            {mode === "standard" && <SourceVideo style={videoStyle}></SourceVideo> }
            {mode === "multiview" && <VuiMultiview {...multiviewSettings}></VuiMultiview> }
        </>
      </LocalView>
    </ViuCoreComponent>
  );
}

