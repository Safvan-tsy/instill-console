"use client";

import * as React from "react";
import { Input } from "@instill-ai/design-system";
import { InstillStore, useInstillStore, useShallow } from "../../../../../lib";
import { IteratorNodeData } from "../../../type";
import { Node } from "reactflow";
import { isIteratorNode } from "../../../lib";

const selector = (store: InstillStore) => ({
  tempSavedNodesForEditingIteratorFlow:
    store.tempSavedNodesForEditingIteratorFlow,
  updateTempSavedNodesForEditingIteratorFlow:
    store.updateTempSavedNodesForEditingIteratorFlow,
  editingIteratorID: store.editingIteratorID,
  updatePipelineRecipeIsDirty: store.updatePipelineRecipeIsDirty,
});

export const OutputValueInput = ({ outputKey }: { outputKey: string }) => {
  const {
    tempSavedNodesForEditingIteratorFlow,
    updateTempSavedNodesForEditingIteratorFlow,
    editingIteratorID,
    updatePipelineRecipeIsDirty,
  } = useInstillStore(useShallow(selector));

  const outputValue = React.useMemo(() => {
    const iteratorNode = tempSavedNodesForEditingIteratorFlow.find(
      (node) => node.id === editingIteratorID && isIteratorNode(node)
    ) as Node<IteratorNodeData> | undefined;

    if (iteratorNode) {
      return iteratorNode.data.outputElements[outputKey];
    }
  }, [tempSavedNodesForEditingIteratorFlow, editingIteratorID, outputKey]);

  return (
    <Input.Root className="!h-8 !w-[250px]">
      <Input.Core
        className="!product-body-text-4-medium"
        value={outputValue}
        onChange={(e) => {
          updateTempSavedNodesForEditingIteratorFlow((nodes) =>
            nodes.map((node) => {
              if (node.id === editingIteratorID && isIteratorNode(node)) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    outputElements: {
                      ...node.data.outputElements,
                      [outputKey]: e.target.value,
                    },
                  },
                };
              }

              return node;
            })
          );
          updatePipelineRecipeIsDirty(() => true);
        }}
      />
    </Input.Root>
  );
};
