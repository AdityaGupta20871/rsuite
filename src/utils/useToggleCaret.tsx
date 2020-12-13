import { useMemo } from 'react';
import ArrowDownLine from '@rsuite/icons/legacy/AngleDown';
import ArrowUpLine from '@rsuite/icons/legacy/AngleUp';
import ArrowLeftLine from '@rsuite/icons/legacy/AngleLeft';
import ArrowRightLine from '@rsuite/icons/legacy/AngleRight';

import { TypeAttributes } from '../@types/common';
import useCustom from './useCustom';

function useToggleCaret(placement: TypeAttributes.Placement8 | TypeAttributes.Placement) {
  const { rtl } = useCustom('Dropdown');
  return useMemo(() => {
    switch (true) {
      case /^top/.test(placement):
        return ArrowUpLine;
      case /^right/.test(placement):
        return rtl ? ArrowLeftLine : ArrowRightLine;
      case /^left/.test(placement):
        return rtl ? ArrowRightLine : ArrowLeftLine;
      case /^bottom/.test(placement):
      default:
        return ArrowDownLine;
    }
  }, [placement, rtl]);
}

export default useToggleCaret;
