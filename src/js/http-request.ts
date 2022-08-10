const noop: () => void = () => {};

interface Request {
  method: string;
  url: string;
  type: XMLHttpRequestResponseType;
  onSuccess: (data: any) => void;
  onError: (data: any) => void;
}

export default function httpRequest({
  method = 'GET',
  url,
  type = 'json',
  onSuccess = noop,
  onError = noop,
}: Request): void {
  const request = new XMLHttpRequest();

  request.open(method, url);
  request.responseType = type;

  request.send();

  request.addEventListener('load', () => {
    if (request.status === 200) {
      onSuccess(request.response);
    } else {
      onError(request.response || 'Неизвестная ошибка');
    }
  });

  request.addEventListener('error', () => {
    onError('Сеть недоступна');
  });
}
