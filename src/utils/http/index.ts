import type { API } from '@/services/model/baseModel';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { assign, isEmpty } from 'lodash-es';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { mockAdapter } from '@/mock';
import { getAuthorization } from '@/utils/auth';
import { isUseMock } from '@/utils/env';
// import { getBaseUrl, isUseMock } from '@/utils/env';
import { handleHttpStatus, handleLogicError } from './faultTolerance';
// const BASE_URL = getBaseUrl();

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};

interface ConfigMeta {
  ignoreAuth: boolean // 是否需要凭证
  noAuthorization: boolean // 是否需要TOKEN
}

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: '/',
  ...AdapterUniapp({
    /* #ifndef APP-PLUS */
    mockRequest: isUseMock() ? mockAdapter : undefined, // APP 平台无法使用mock
    /* #endif */
  }),
  timeout: 5000,
  beforeRequest: async (method) => {
    method.config.headers = assign(method.config.headers, ContentType);
    const { config, url } = method;
    if (!/^\/api\//.test(url)) {
      method.url = `/api${url}`;
    }

    const { ignoreAuth, noAuthorization } = config.meta as ConfigMeta || {};
    const authorization = ignoreAuth ? getAuthorization() : null;
    if (ignoreAuth && !authorization) {
      throw new Error('[请求错误]：未登录');
    }
    if (!noAuthorization) {
      method.config.headers.authorization = getAuthorization();
    }
  },
  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config } = method;
      const { requestType } = config;
      const { statusCode, data: rawData, errMsg } = response as UniNamespace.RequestSuccessCallbackResult;
      if (statusCode === 200) {
        if (requestType) {
          return response;
        }
        const { code, message, data } = rawData as API;
        if (code === ResultEnum.SUCCESS) {
          return data as any;
        } else if (!isEmpty(data)) {
          return rawData;
        }
        // 逻辑错误处理，与业务相关
        handleLogicError(code, message);
        throw new Error(`请求错误[${code}]：${message}`);
      }
      // 处理http状态错误
      handleHttpStatus(statusCode, errMsg || '');
      throw new Error(`HTTP请求错误[${statusCode}]：${errMsg}`);
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     */
    onError: async (err) => {
      throw new Error(`请求失败：${err}`);
    },
    /**
     * 请求完成的拦截器, 无论请求成功或失败都会进入该拦截器
     */
    onComplete: async () => {
      // 处理请求完成逻辑
    },
  },
});

export const request = alovaInstance;
