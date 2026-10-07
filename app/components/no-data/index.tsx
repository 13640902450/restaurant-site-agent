import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'
import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ScaleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export type INoDataProps = {}

/* Bento 布局：第一张为大卡（横跨 2 格），其余小卡，最后一张横条收尾 */
const FEATURES = [
  {
    icon: CalculatorIcon,
    title: '成本结构测算',
    desc: '投资、租金、人工、水电逐项拆解，一眼看清每月固定与变动成本。',
    tile: 'bg-amber-400/15 text-amber-300 ring-amber-400/30',
    span: 'xl:col-span-2',
    large: true,
  },
  {
    icon: ScaleIcon,
    title: '盈亏平衡',
    desc: '保本营业额、回本周期与安全边际',
    tile: 'bg-yellow-400/15 text-yellow-300 ring-yellow-400/30',
  },
  {
    icon: UsersIcon,
    title: '客流压力',
    desc: '保守与乐观客流下的承载力校验',
    tile: 'bg-sky-400/15 text-sky-300 ring-sky-400/30',
  },
  {
    icon: BuildingStorefrontIcon,
    title: '商圈竞品',
    desc: '竞品密度与差异化机会点',
    tile: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30',
  },
  {
    icon: ExclamationTriangleIcon,
    title: '风险提示',
    desc: '关键风险点与敏感变量识别',
    tile: 'bg-rose-400/15 text-rose-300 ring-rose-400/30',
  },
  {
    icon: LightBulbIcon,
    title: '行动建议',
    desc: '可落地的优化与谈判要点',
    tile: 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
    span: 'xl:col-span-3',
    strip: true,
  },
]

const DELAYS = ['animate-delay-1', 'animate-delay-2', 'animate-delay-3', 'animate-delay-4', 'animate-delay-5']

const NoData: FC<INoDataProps> = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center px-2 py-6 text-center'>
      <div className='animate-fade-up inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200'>
        <span className='animate-pulse-dot h-1.5 w-1.5 rounded-full bg-amber-400' />
        智能餐饮选址 Agent · 就绪
      </div>

      <h2 className='animate-fade-up animate-delay-1 mt-5 max-w-2xl text-[30px] font-bold leading-tight tracking-tight text-white'>
        填写经营数据，生成
        <span className='brand-gradient-text'>点位可行性评估</span>
      </h2>

      <p className='animate-fade-up animate-delay-2 mt-3 max-w-lg text-sm leading-6 text-gray-400'>
        从成本结构、盈亏平衡到商圈竞品，Agent 会逐步推理，输出可执行的选址建议。
      </p>

      <div className='mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        {FEATURES.map(({ icon: Icon, title, desc, tile, span, large, strip }, index) => (
          <div
            key={title}
            className={cn(
              'card-hover animate-fade-up group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-sm',
              span,
              strip && 'flex items-center gap-3',
              DELAYS[index % DELAYS.length],
            )}
          >
            {/* 超大数字水印 */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute -bottom-3 -right-1 select-none font-black leading-none text-white/[0.045]',
                large ? 'text-[72px]' : 'text-[52px]',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={cn('flex items-start gap-3', strip && 'items-center')}>
              <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset', tile)}>
                <Icon className='h-5 w-5' />
              </div>
              <div className='min-w-0'>
                <div className={cn('text-[13px] font-semibold text-gray-100', strip && 'mt-0')}>{title}</div>
                <div className='mt-1 text-[11px] leading-5 text-gray-500'>{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='animate-fade-up animate-delay-5 mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-400 shadow-lg shadow-black/20 backdrop-blur-sm'>
        <ArrowTrendingUpIcon className='h-3.5 w-3.5 text-amber-400' />
        在左侧填写表单后，点击「开始评估」
        <ArrowRightIcon className='h-3.5 w-3.5 text-amber-300' />
      </div>
    </div>
  )
}
export default React.memo(NoData)