import { SetMetadata } from '@nestjs/common';

export const ONLY_STAFF = 'onlyStaff';
export const OnlyStaff = () => SetMetadata(ONLY_STAFF, true);
