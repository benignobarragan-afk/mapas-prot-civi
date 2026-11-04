export const EDIFICIOS = [
  {
    id: 'a',
    nombre: 'Edificio A',
    elementos: [
      { id: 'a1', tipo: 'Extintor', ubicacion: 'Planta baja, acceso principal', ok: true },
      { id: 'a2', tipo: 'Botiquín', ubicacion: 'Planta baja, administración', ok: true },
      { id: 'a3', tipo: 'Salida de emergencia', ubicacion: 'Pasillo norte', ok: true },
    ],
  },
  {
    id: 'b',
    nombre: 'Edificio B',
    elementos: [
      { id: 'b1', tipo: 'Extintor', ubicacion: 'Planta alta, escaleras', ok: false },
      { id: 'b2', tipo: 'Punto de reunión', ubicacion: 'Explanada principal', ok: true },
    ],
  },
];
