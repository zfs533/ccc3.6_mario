import request from '@/utils/request';

export function login(data) {
    return request.post(`/api/admin/user/login`, data);
}

export function logout(data) {
    return request.post(`/api/admin/user/logout`, data);
}
