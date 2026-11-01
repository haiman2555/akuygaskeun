import React from "react";
import { Composition, Folder } from "remotion";
import { EditTimeline } from "./compositions/EditTimeline";
import { StylePreview, STYLE_PREVIEW_FRAMES } from "./compositions/StylePreview";
import { PROJECTS } from "./projects";
import { editDuration } from "./schema/edit";
import { FORMAT, defaults } from "./style/tokens";

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Style">
      <Composition
        id="StylePreview"
        component={StylePreview}
        width={FORMAT.width}
        height={FORMAT.height}
        fps={FORMAT.fps}
        durationInFrames={STYLE_PREVIEW_FRAMES}
      />
    </Folder>
    <Folder name="Projects">
      {PROJECTS.map((edit) => (
        <Composition
          key={edit.id}
          id={edit.id}
          component={EditTimeline}
          width={FORMAT.width}
          height={FORMAT.height}
          fps={FORMAT.fps}
          durationInFrames={editDuration(edit, defaults.transition)}
          defaultProps={{ edit }}
        />
      ))}
    </Folder>
  </>
);
