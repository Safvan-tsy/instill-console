import { createInstillAxiosClient } from "../helper";
import { Nullable } from "../../type";
import { ModelTask } from "./types";
import { Operation } from "../operation/types";

export type DeployUserModelResponse = {
  modelId: string;
};

export async function deployUserModelAction({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, true);

    const { data } = await client.post<DeployUserModelResponse>(
      `/${modelName}/deploy`
    );
    return Promise.resolve(data.modelId);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UndeployUserModelResponse = {
  modelId: string;
};

export async function undeployUserModeleAction({
  modelName,
  accessToken,
}: {
  modelName: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, true);

    const { data } = await client.post<UndeployUserModelResponse>(
      `/${modelName}/undeploy`
    );
    return Promise.resolve(data.modelId);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type TriggerUserModelPayload = {
  taskInputs: Record<string, unknown>[];
};

export type TriggerUserModelResponse = {
  task: ModelTask;
  taskOutputs: Record<string, Record<string, unknown>>[];
};

export type TriggerUserModelAsyncResponse = {
  operation: Operation;
};

export async function triggerUserModelAction({
  modelName,
  payload,
  accessToken,
}: {
  modelName: string;
  payload: TriggerUserModelPayload;
  accessToken: Nullable<string>;
  returnTraces?: boolean;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, true);

    const { data } = await client.post<TriggerUserModelResponse>(
      `/${modelName}/trigger`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function triggerUserModelActionAsync({
  modelName,
  payload,
  accessToken,
}: {
  modelName: string;
  payload: TriggerUserModelPayload;
  accessToken: Nullable<string>;
  returnTraces?: boolean;
}) {
  try {
    const client = createInstillAxiosClient(accessToken, true);

    const { data } = await client.post<TriggerUserModelAsyncResponse>(
      `/${modelName}/triggerAsync`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
