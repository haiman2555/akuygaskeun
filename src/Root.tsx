import React from "react";
import { Composition, Folder } from "remotion";
import { EditTimeline } from "./compositions/EditTimeline";
import { styleboard } from "./compositions/styleboard";
import { PROJECTS } from "./projects";
import { editDuration, type Edit } from "./schema/edit";
import { FORMAT } from "./style/tokens";

const EditComposition: React.FC<{ edit: Edit }> = ({ edit }) => (
  <Composition
    id={edit.id}
    component={EditTimeline}
    width={FORMAT.width}
    height={FORMAT.height}
    fps={FORMAT.fps}
    durationInFrames={editDuration(edit)}
    defaultProps={{ edit }}
  />
);

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Style">
      <EditComposition edit={styleboard} />
    </Folder>
    <Folder name="Projects">
      {PROJECTS.map((edit) => (
        <EditComposition key={edit.id} edit={edit} />
      ))}
    </Folder>
  </>
);
