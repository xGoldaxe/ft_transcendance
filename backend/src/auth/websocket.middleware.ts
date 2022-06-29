import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Socket } from 'socket.io';
import { UserService } from 'src/prisma/user/user.service';

export interface AuthSocket extends Socket {
  user: User;
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;
export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UserService,
  configService: ConfigService,
): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const jwtPayload = jwtService.verify(socket.handshake.auth.token ?? '', {
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });

      const userResult = await userService.user({
        id: jwtPayload.sub,
      });

      if (userResult) {
        socket.user = userResult;
        next();
      } else {
        next({
          name: 'Access Denied',
          message: 'Access Denied',
        });
      }
    } catch (error) {
      console.error(error);
      next({
        name: 'Access Denied',
        message: 'Access Denied',
      });
    }
  };
};
