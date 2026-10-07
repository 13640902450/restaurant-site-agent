import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  PlayIcon,
} from '@heroicons/react/24/solid'
import cn from 'classnames'
import Select from '@/app/components/base/select'
import type { PromptConfig, VisionFile, VisionSettings } from '@/types/app'
import Button from '@/app/components/base/button'
import { DEFAULT_VALUE_MAX_LEN } from '@/config'
import TextGenerationImageUploader from '@/app/components/base/image-uploader/text-generation-image-uploader'

export type IRunOnceProps = {
  promptConfig: PromptConfig
  inputs: Record<string, any>
  onInputsChange: (inputs: Record<string, any>) => void
  onSend: () => void
  visionConfig: VisionSettings
  onVisionFilesChange: (files: VisionFile[]) => void
}
const RunOnce: FC<IRunOnceProps> = ({
  promptConfig,
  inputs,
  onInputsChange,
  onSend,
  visionConfig,
  onVisionFilesChange,
}) => {
  const { t } = useTranslation()

  const onClear = () => {
    const newInputs: Record<string, any> = {}
    promptConfig.prompt_variables.forEach((item) => {
      newInputs[item.key] = ''
    })
    onInputsChange(newInputs)
  }

  return (
    <div className="flex grow flex-col">
      <section className='flex grow flex-col'>
        {/* input form */}
        <form className='grid grid-cols-1 gap-x-4 xl:grid-cols-2'>
          {promptConfig.prompt_variables.map(item => (
            <div className={cn('group mt-4', item.type === 'paragraph' && 'xl:col-span-2')} key={item.key}>
              <label className='flex items-center gap-1 text-[13px] font-medium text-gray-300 transition-colors group-focus-within:text-amber-300'>
                {item.name}
                {item.required !== false && <span className='text-amber-400'>*</span>}
              </label>
              <div className='mt-2'>
                {item.type === 'select' && (
                  <Select
                    className='w-full'
                    defaultValue={inputs[item.key]}
                    onSelect={(i) => { onInputsChange({ ...inputs, [item.key]: i.value }) }}
                    items={(item.options || []).map(i => ({ name: i, value: i }))}
                    allowSearch={false}
                    bgClassName='bg-white/[0.05]'
                  />
                )}
                {item.type === 'string' && (
                  <input
                    type="text"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3.5 text-[13px] text-gray-100 outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/20 focus:border-amber-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-amber-400/10"
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                    maxLength={item.max_length || DEFAULT_VALUE_MAX_LEN}
                  />
                )}
                {item.type === 'paragraph' && (
                  <textarea
                    className="h-28 w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-3 text-[13px] leading-6 text-gray-100 outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/20 focus:border-amber-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-amber-400/10"
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
                {item.type === 'number' && (
                  <input
                    type="number"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3.5 text-[13px] text-gray-100 outline-none transition duration-200 placeholder:text-gray-600 hover:border-white/20 focus:border-amber-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-amber-400/10"
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
              </div>
            </div>
          ))}
          {
            visionConfig?.enabled && (
              <div className="mt-4 w-full">
                <div className="text-[13px] font-medium text-gray-700">{t('common.imageUploader.imageUpload')}</div>
                <div className='mt-2'>
                  <TextGenerationImageUploader
                    settings={visionConfig}
                    onFilesChange={files => onVisionFilesChange(files.filter(file => file.progress !== -1).map(fileItem => ({
                      type: 'image',
                      transfer_method: fileItem.type,
                      url: fileItem.url,
                      upload_file_id: fileItem.fileId,
                    })))}
                  />
                </div>
              </div>
            )
          }
        </form>

        {/* 固定在面板底部的操作区：内容过长滚动时主按钮始终可见 */}
        <div className='sticky bottom-0 z-10 mt-auto shrink-0 border-t border-white/10 bg-[#0B0D12]/70 pt-4 backdrop-blur-md'>
          <div className='mb-3 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs leading-5 text-amber-200/90'>
            <span className='mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-amber-400' />
            <span>请尽量使用真实调研数据；评估结论用于辅助判断，不构成投资承诺。</span>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className='!h-11 !rounded-xl !border-white/15 !px-5 !text-gray-400 transition hover:!border-white/30 hover:!bg-white/5 hover:!text-gray-200'
              onClick={onClear}
              disabled={false}
            >
              <span className='text-[13px]'>{t('common.operation.clear')}</span>
            </Button>
            <Button
              type="primary"
              className='brand-gradient-bg !h-11 !rounded-xl !border-0 !px-6 shadow-lg shadow-amber-900/40 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-800/40'
              onClick={onSend}
              disabled={false}
            >
              <PlayIcon className="mr-1.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className='text-sm font-semibold tracking-wide'>{t('app.generation.run')}</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
export default React.memo(RunOnce)
