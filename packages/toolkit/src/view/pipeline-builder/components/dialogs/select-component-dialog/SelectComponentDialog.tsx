import cn from "clsx";
import { Button, Dialog, Icons, ScrollArea } from "@instill-ai/design-system";

import {
  ConnectorDefinition,
  ConnectorWithDefinition,
  IteratorDefinition,
  OperatorDefinition,
  useInstillStore,
} from "../../../../../lib";
import { ExistingConnectorSection } from "./ExistingConnectorSection";
import { NewConnectorSection } from "./NewConnectorSection";
import { OperatorSection } from "./OperatorSection";
import { IteratorSection } from "./IteratorSection";

export type OnSelectComponent = (
  definition: ConnectorDefinition | OperatorDefinition | IteratorDefinition,
  connector?: ConnectorWithDefinition
) => void;

export const SelectComponentDialog = ({
  open,
  onOpenChange,
  onSelect,
  disabled,
  disabledTrigger,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSelect: OnSelectComponent;
  disabled?: boolean;
  disabledTrigger?: boolean;
}) => {
  const isEditingIterator = useInstillStore((store) => store.isEditingIterator);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {disabledTrigger ? null : (
        <Dialog.Trigger asChild>
          <Button
            disabled={disabled}
            className="!h-8 gap-x-2"
            variant="primary"
            size="lg"
          >
            Connector
            <Icons.Plus
              className={cn(
                "h-4 w-4",
                disabled
                  ? "stroke-semantic-fg-secondary"
                  : "stroke-semantic-bg-primary"
              )}
            />
          </Button>
        </Dialog.Trigger>
      )}
      <Dialog.Content className="flex !max-w-[1048px] flex-col overflow-y-auto !p-0">
        <ScrollArea.Root className="h-[700px] p-6">
          <Dialog.Close className="bg-semantic-bg-primary" />
          <Dialog.Header className="mb-4">
            <Dialog.Title className="mx-auto !product-headings-heading-3">
              Add a connector
            </Dialog.Title>
            <Dialog.Description className="mx-auto">
              Select a connector to add to your pipeline
            </Dialog.Description>
          </Dialog.Header>
          {isEditingIterator ? null : <IteratorSection onSelect={onSelect} />}
          <OperatorSection onSelect={onSelect} />
          <ExistingConnectorSection onSelect={onSelect} />
          <NewConnectorSection onSelect={onSelect} />
        </ScrollArea.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};