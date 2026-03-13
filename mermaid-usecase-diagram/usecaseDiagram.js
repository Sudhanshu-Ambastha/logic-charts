const parser = {
  parse(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.includes('-->'));
    
    return {
      connections: lines.map(line => {
        const match = line.match(/(.+?)--(?:\s*<<(.+?)>>\s*)?-->\s*(.+)/);
        
        if (match) {
          return {
            from: match[1].trim(),
            type: match[2] ? match[2].toLowerCase() : 'association',
            to: match[3].trim()
          };
        }
        return { from: 'unknown', to: 'unknown', type: 'association' };
      })
    };
  }
};

export default { parser };