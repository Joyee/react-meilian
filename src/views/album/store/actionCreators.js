import * as promise from '../../../utils/promise'
import {
  getModelListUrl,
} from '../../../api/config'

/**
 * 获取模板列表和卡片信息
 * @param {String} template_id 模板id
 * @param {String} page 页码
 */
export const getModelsList = async (template_id = '', page = 1) => {
  const result = await promise.albumRequest(
    `${getModelListUrl}`,
    promise.methodType.GET,
    {
      template_id,
      page
    }
  )
  console.log(result.data)
  if (result.status === 200) {
    return result.data
  }
  return false
}