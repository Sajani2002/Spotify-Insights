import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const SpotifyInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: attach access token here once AuthService is ready
  return next(req);
};
