import { mount } from '@vue/test-utils'
import Map from '../../components/Map.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('leaflet', () => ({
    default: {
        map: vi.fn(() => ({
            setView: vi.fn().mockReturnThis(),
            addTo: vi.fn().mockReturnThis()
        })),
        tileLayer: vi.fn(() => ({
            addTo: vi.fn()
        })),
        marker: vi.fn(() => ({
            addTo: vi.fn(() => ({
                bindPopup: vi.fn()
            }))
        }))
    }
}))

globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                {
                    lat: '-15.6',
                    lon: '-56.1'
                }
            ])
    })
) as any

const fakeDesaparecidos = [
    {
        nome: 'João',
        idade: 30,
        ultimaOcorrencia: {
            localDesaparecimentoConcat: 'Cuiabá/MT',
            dtDesaparecimento: '2025-03-29T21:40:00'
        }
    }
]

describe('MapaDesaparecidos.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('monta o mapa com marcador para desaparecidos', async () => {
        const wrapper = mount(Map, {
            props: {
                desaparecidos: fakeDesaparecidos
            }
        })

        expect(wrapper.text()).toContain('Mapa de Desaparecidos')
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('https://nominatim.openstreetmap.org/search?format=json&q=Cuiab%C3%A1%2FMT')
        )
    })
})
