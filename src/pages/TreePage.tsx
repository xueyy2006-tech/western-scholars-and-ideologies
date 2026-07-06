import KnowledgeTree from '../components/KnowledgeTree'

export default function TreePage() {
  return (
    <div className="space-y-4 py-2">
      <div>
        <h2 className="text-xl font-bold">知识树</h2>
        <p className="text-sm text-gray-500 mt-1">点击节点查看详情 · 拖拽移动 · 滚轮缩放 · 右上角筛选</p>
      </div>
      <KnowledgeTree />
    </div>
  )
}
