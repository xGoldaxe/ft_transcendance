import { Status } from '@prisma/client';

export default interface UserPublic {
  id: number;
  name: string;
  status: Status;
  avatar: string;
  otp_enable: boolean;
}
