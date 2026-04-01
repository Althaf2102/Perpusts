import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from
'@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator'; 
import { error } from 'console';
import { STATUS_CODES } from 'http';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requiredRoles.some((role) => user?.role === role);

    if (!hasRole) {
      throw new UnauthorizedException({
        message: "Petugas tidak bisa menambahkan",
        error: "unauthorized",
        statusCode: 401,
      });
    }

    return true;
  }
}