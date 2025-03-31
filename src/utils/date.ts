export const formatarDataHora = (iso: string) => {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
  
    const dia = d.getDate().toString().padStart(2, '0')
    const mes = (d.getMonth() + 1).toString().padStart(2, '0')
    const ano = d.getFullYear().toString().slice(-2)
    const hora = d.getHours().toString().padStart(2, '0')
    const min = d.getMinutes().toString().padStart(2, '0')
  
    return `${dia}/${mes}/${ano} - ${hora}:${min}`
  }
  