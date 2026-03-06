import '@logseq/libs'

async function main() {
  console.log('Task Unschedule Plugin loaded')

  // Function to check if block has a non-repeating SCHEDULED in content
  function hasScheduledInContent(content: string): boolean {
    if (!/^SCHEDULED:\s*<[^>]+>/mi.test(content)) return false
    // Skip repeating tasks (e.g. .+1w, ++1d, +1m)
    if (/^SCHEDULED:\s*<[^>]*(?:\.\+|\+\+|\+)\d+[hdwmy][^>]*>/mi.test(content)) return false
    return true
  }

  // Function to remove SCHEDULED line from block content
  async function removeScheduledProperty(blockUuid: string) {
    try {
      const block = await logseq.Editor.getBlock(blockUuid)
      if (!block) return

      const content = block.content || ''
      
      if (hasScheduledInContent(content)) {
        console.log(`Removing SCHEDULED line from completed todo: ${blockUuid}`)
        
        // Remove the SCHEDULED line from content
        const updatedContent = content.replace(/^SCHEDULED:\s*<[^>]+>\s*\r?\n?/mi, '').trim()
        
        await logseq.Editor.updateBlock(blockUuid, updatedContent)
        logseq.UI.showMsg('SCHEDULED line removed from completed todo', 'success')
      }
    } catch (error) {
      console.error('Error removing SCHEDULED property:', error)
    }
  }

  // Simplified function to check if a block is a completed todo
  function isCompletedTodo(content: string): boolean {
    if (!content) return false
    
    const trimmed = content.trim()
    // Simplified patterns - just the most common ones
    return /^(DONE|COMPLETED|CANCELED|CANCELLED|\[x\])\s+/i.test(trimmed)
  }

  // Listen for database changes and process completed todos
  logseq.DB.onChanged(async (e) => {
    if (e.blocks && e.blocks.length > 0) {
      for (const block of e.blocks) {
        if (isCompletedTodo(block.content || '') && hasScheduledInContent(block.content || '')) {
          await removeScheduledProperty(block.uuid)
        }
      }
    }
  })
}

// Initialize the plugin when Logseq is ready
logseq.ready(main).catch(console.error)