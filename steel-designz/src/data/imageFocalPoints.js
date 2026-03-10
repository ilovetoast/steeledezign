/**
 * Per-image object-position for makeup portfolio
 * Keeps faces visible when object-fit: cover crops the frame
 * Based on face/focal-point position in each photo
 */
export const IMAGE_FOCAL_POINTS = {
  // Dramatic - faces mostly center or center-top
  'editi-ali': 'center',
  'kelly-1-of-18': 'center',
  'kelly-12-of-18': 'center',
  'lips-edit-3-of-6': 'center',
  'MG_1449': 'center',
  'MG_6876': 'center',

  // Editorial - head-shot has face in upper third
  'ALIfinal-1-of-1-6-e1456543610512': 'center',
  balloons: 'center 40%',
  DSC0177: 'center',
  'head-shot': 'center top',
  Jamie: 'center',

  // Portfolio - varied compositions
  blue2: 'center 35%',
  'editi-ali-e1456544674617': 'center',
  IMG_4366: 'center',
  js2: 'top right',
  'MG_3640-e1456544763383': 'center top',
  'MG_6269-e1456544802817': 'center',
  'MG_6876-e1456544789979': 'center',
  sam1: 'center',
  saraedit: 'right center',
}
