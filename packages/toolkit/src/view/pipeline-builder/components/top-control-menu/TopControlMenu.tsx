import * as React from "react";
import { Run } from "./Run";
import { Toolkit } from "./Toolkit";
import { Save } from "./Save";
import { Share } from "./Share";
import { Release } from "./Release";
import { CreateResourceDialog } from "../CreateResourceDialog";
import { PublishPipelineDialog, SelectComponentDialog } from "../dialogs";
import {
  InstillStore,
  Nullable,
  useInstillStore,
  useShallow,
} from "../../../../lib";
import { ReactFlowInstance } from "reactflow";
import { useConstructNodeFromDefinition } from "../../lib";
import { useRouter } from "next/router";
import { Button, Icons } from "@instill-ai/design-system";
import { PipelineName } from "./PipelineName";

const selector = (store: InstillStore) => ({
  pipelineIsNew: store.pipelineIsNew,
  isEditingIterator: store.isEditingIterator,
});

export const TopControlMenu = ({
  reactFlowInstance,
}: {
  reactFlowInstance: Nullable<ReactFlowInstance>;
}) => {
  const router = useRouter();
  const { id, entity } = router.query;
  const [open, setOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const constructNode = useConstructNodeFromDefinition({ reactFlowInstance });
  const { pipelineIsNew, isEditingIterator } = useInstillStore(
    useShallow(selector)
  );

  return (
    <React.Fragment>
      <div className="flex w-full flex-row py-[5px]">
        <div className="flex flex-row items-center gap-x-4">
          <Button
            variant="tertiaryGrey"
            onClick={() => {
              if (pipelineIsNew) {
                router.push(`/${entity}/pipelines`);
              } else {
                router.push(`/${entity}/pipelines/${id}`);
              }
            }}
            className="flex cursor-pointer"
          >
            <Icons.ArrowLeft className="my-auto h-5 w-5 stroke-semantic-fg-secondary" />
          </Button>
          {isEditingIterator ? null : (
            <SelectComponentDialog
              open={open}
              onOpenChange={setOpen}
              onSelect={(definition, connector) => {
                constructNode(definition, connector);
                setOpen(false);
              }}
            />
          )}
        </div>
        <div className="flex w-full flex-1 items-center justify-center">
          <PipelineName />
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Run setIsSaving={setIsSaving} />
          <Toolkit />
          <Save isSaving={isSaving} setIsSaving={setIsSaving} />
          <Share />
          <Release />
        </div>
      </div>
      <CreateResourceDialog />
      <PublishPipelineDialog />
    </React.Fragment>
  );
};