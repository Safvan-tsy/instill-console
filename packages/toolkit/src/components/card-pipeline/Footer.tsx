"use client";

import * as React from "react";
import { Button, Icons, Separator, Tag } from "@instill-ai/design-system";
import {
  InstillStore,
  Pipeline,
  isPublicPipeline,
  useInstillStore,
  useShallow,
  useAuthenticatedUser,
  useNavigateBackAfterLogin,
} from "../../lib";
import { sortPipelineReleases } from "../../view";
import { ClonePipelineDialog } from "../ClonePipelineDialog";
import { useRouter } from "next/navigation";

export const FooterSkeleton = () => {
  return (
    <div className="flex flex-col px-6 pb-4">
      <div className="flex flex-row">
        <div className="h-5 w-20 shrink-0 grow-0 animate-pulse rounded bg-semantic-bg-secondary"></div>
      </div>
      <Separator orientation="horizontal" className="my-2" />
      <div className="flex flex-row-reverse">
        <div className="h-10 w-[100px] shrink-0 grow-0 animate-pulse rounded bg-semantic-bg-secondary"></div>
      </div>
    </div>
  );
};

const selector = (store: InstillStore) => ({
  accessToken: store.accessToken,
  enabledQuery: store.enabledQuery,
});

export const Footer = ({
  pipeline,
  disabledPermissionLabel,
}: {
  pipeline: Pipeline;
  disabledPermissionLabel?: boolean;
}) => {
  const router = useRouter();
  const navigateBackAfterLogin = useNavigateBackAfterLogin();

  const { accessToken, enabledQuery } = useInstillStore(useShallow(selector));

  const latestRelease = React.useMemo(() => {
    if (pipeline.releases.length === 0) {
      return null;
    }
    return sortPipelineReleases(pipeline.releases)[0].id;
  }, [pipeline]);

  const me = useAuthenticatedUser({
    enabled: enabledQuery,
    accessToken,
  });

  const isPublic = isPublicPipeline(pipeline);

  return (
    <div className="flex flex-col px-6 pb-4">
      <div className="flex flex-row gap-x-2">
        {disabledPermissionLabel ? null : (
          <Tag className="!py-0" variant="lightNeutral" size="sm">
            {isPublic ? "Public" : "Private"}
          </Tag>
        )}
        {latestRelease ? (
          <Tag className="!py-0" variant="darkBlue" size="sm">
            {latestRelease}
          </Tag>
        ) : null}
      </div>
      <Separator orientation="horizontal" className="my-2" />
      <div className="flex flex-row-reverse">
        {pipeline.permission.canEdit ? (
          <Button
            className="flex flex-row gap-x-2"
            variant="secondaryColour"
            size="lg"
            onClick={() => {
              router.push(
                `/${pipeline.ownerName.split("/")[1]}/pipelines/${
                  pipeline.id
                }/editor`
              );
            }}
          >
            <Icons.Tool01 className="h-4 w-4 stroke-semantic-accent-default" />
            Edit
          </Button>
        ) : me.isSuccess ? (
          <ClonePipelineDialog
            trigger={
              <Button
                className="flex flex-row gap-x-2"
                variant="secondaryColour"
                size="lg"
              >
                <Icons.Copy07 className="h-3 w-3 stroke-semantic-accent-default" />
                Clone
              </Button>
            }
            pipeline={pipeline}
          />
        ) : (
          <Button
            onClick={() => {
              const pipelineNameFrag = pipeline.name.split("/");
              const targetPipelinePathname = `/${pipelineNameFrag[1]}/pipelines/${pipelineNameFrag[3]}`;

              navigateBackAfterLogin(targetPipelinePathname);
            }}
            className="!normal-case"
            variant="secondaryColour"
            size="lg"
          >
            Log in to Clone
          </Button>
        )}
      </div>
    </div>
  );
};
Footer.Skeleton = FooterSkeleton;
