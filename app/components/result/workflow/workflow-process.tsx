import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import cn from 'classnames'
import NodePanel from './node'
import type { WorkflowProcess } from '@/types/app'
import { CheckCircle } from '@/app/components/base/icons/solid/general'
import { AlertCircle } from '@/app/components/base/icons/solid/alertsAndFeedback'
import { Loading02 } from '@/app/components/base/icons/line/general'
import { ChevronRight } from '@/app/components/base/icons/line/arrows'
import { WorkflowRunningStatus } from '@/types/app'

type WorkflowProcessProps = {
  data: WorkflowProcess
  grayBg?: boolean
  expand?: boolean
  hideInfo?: boolean
}
const WorkflowProcessItem = ({
  data,
  grayBg,
  expand = false,
  hideInfo = false,
}: WorkflowProcessProps) => {
  const [collapse, setCollapse] = useState(!expand)
  const running = data.status === WorkflowRunningStatus.Running
  const succeeded = data.status === WorkflowRunningStatus.Succeeded
  const failed = data.status === WorkflowRunningStatus.Failed || data.status === WorkflowRunningStatus.Stopped

  const background = useMemo(() => {
    if (running && !collapse)
      return 'linear-gradient(180deg, rgba(240, 160, 50, 0.14) 0%, rgba(240, 160, 50, 0.04) 100%)'

    if (succeeded && !collapse)
      return 'linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.03) 100%)'

    if (failed && !collapse)
      return 'linear-gradient(180deg, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0.03) 100%)'
  }, [running, succeeded, failed, collapse])

  useEffect(() => {
    setCollapse(!expand)
  }, [expand])

  return (
    <div
      className={cn(
        'mb-2 rounded-xl border-[0.5px] border-white/10',
        collapse ? 'py-[7px]' : hideInfo ? 'pt-2 pb-1' : 'py-2',
        collapse && (!grayBg ? 'bg-white/[0.03]' : 'bg-white/[0.02]'),
        hideInfo ? 'mx-[-8px] px-1' : 'w-full px-3',
      )}
      style={{
        background,
      }}
    >
      <div
        className={cn(
          'flex items-center h-[18px] cursor-pointer',
          hideInfo && 'px-[6px]',
        )}
        onClick={() => setCollapse(!collapse)}
      >
        {
          running && (
            <Loading02 className='shrink-0 mr-1 w-3 h-3 text-[#667085] animate-spin' />
          )
        }
        {
          succeeded && (
            <CheckCircle className='shrink-0 mr-1 w-3 h-3 text-[#12B76A]' />
          )
        }
        {
          failed && (
            <AlertCircle className='shrink-0 mr-1 w-3 h-3 text-[#F04438]' />
          )
        }
        <div className='grow text-xs font-medium text-gray-300 leading-[18px]'>工作流进度</div>
        <ChevronRight className={`'ml-1 w-3 h-3 text-gray-500' ${collapse ? '' : 'rotate-90'}`} />
      </div>
      {
        !collapse && (
          <div className='mt-1.5'>
            {
              data.tracing.map(node => (
                <div key={node.id} className='mb-0.5 last-of-type:mb-0'>
                  <NodePanel
                    nodeInfo={node}
                    hideInfo={hideInfo}
                  />
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default WorkflowProcessItem
