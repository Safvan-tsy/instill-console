import cn from "clsx";
import * as React from "react";
import { InstillStore, Nullable, useInstillStore } from "../../../lib";
import { Textarea } from "@instill-ai/design-system";
import { useShallow } from "zustand/react/shallow";

const selector = (store: InstillStore) => ({
  updateNodes: store.updateNodes,
  updatePipelineRecipeIsDirty: store.updatePipelineRecipeIsDirty,
  selectedConnectorNodeId: store.selectedConnectorNodeId,
});

export const NodeWrapper = ({
  nodeType,
  id,
  children,
  noteIsOpen,
  note,
}: {
  nodeType: "start" | "end" | "connector" | "operator";
  id: string;
  children: React.ReactNode;
  noteIsOpen: boolean;
  note: Nullable<string>;
}) => {
  const { updateNodes, updatePipelineRecipeIsDirty, selectedConnectorNodeId } =
    useInstillStore(useShallow(selector));
  const timer = React.useRef<Nullable<number>>(null);
  const [noteValue, setNoteValue] = React.useState(note);

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute right-0 top-0 w-[var(--pipeline-builder-node-available-width)] rounded border border-semantic-warning-default bg-semantic-warning-bg p-2",
          noteIsOpen ? "" : "hidden",
          "-translate-y-[calc(100%+25px)]"
        )}
      >
        <Textarea
          className="nowheel !resize-none !border-none !bg-transparent !text-semantic-fg-disabled !outline-none !product-body-text-4-medium"
          value={noteValue ?? ""}
          onChange={(e) => {
            if (timer.current) {
              clearTimeout(timer.current);
            }

            timer.current = window.setTimeout(() => {
              updateNodes((nodes) =>
                nodes.map((node) => {
                  if (node.id === id && node.data.nodeType === nodeType) {
                    node.data = {
                      ...node.data,
                      note: e.target.value,
                    };

                    return node;
                  }

                  return node;
                })
              );
              updatePipelineRecipeIsDirty(() => true);
            }, 1000);

            setNoteValue(e.target.value);
          }}
        />
      </div>
      <div
        className={cn(
          "flex w-[var(--pipeline-builder-node-available-width)] flex-col rounded-sm border-2 border-semantic-bg-primary bg-semantic-bg-base-bg px-3 py-2.5 shadow-md hover:shadow-lg",
          {
            "outline outline-2 outline-offset-1 outline-semantic-accent-default":
              id === selectedConnectorNodeId,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};