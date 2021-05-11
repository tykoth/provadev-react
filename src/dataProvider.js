import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const uuid = "7a46dc90-dd52-453d-b19e-db7ed04479b6";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
const httpClient = (url, options = {}) => {
  if (url.match("dividas")) {
    url = url.replace(
      "https://jsonplaceholder.typicode.com/dividas",
      "https://provadev.xlab.digital/api/v1/divida"
    );

    if (options.method === "POST") {
      options.body = options.body.replace("userId", "idUsuario");
    }

    if (url.match(/\?/)) {
      url += "&uuid=" + uuid;
    } else {
      url += "?uuid=" + uuid;
    }
    console.log(options);
  }

  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // add your own headers here
  options.headers.set("X-Custom-Header", "foobar");
  return fetchUtils.fetchJson(url, options);
};

export default (apiUrl) => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      // if (!headers.has("x-total-count")) {
      //   throw new Error(
      //     "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
      //   );
      // }
      let data = [];
      let total = 0;
      if (json.hasOwnProperty("result")) {
        data = json.result.map((i) => {
          i.id = i._id;
          i.idUser = i.idUsuario;
          return i;
        });
        total = data.length;
        console.log(data);
      } else {
        data = json;
        total = data.length;
        console.log(json);
      }
      return {
        data: data,
        total: total
        // total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      let data;
      if (json.hasOwnProperty("result")) {
        data = json.result;
        data.id = data._id;
        data.idUser = data.idUsuario;
      } else {
        data = json;
      }
      return {
        data: data
      };
    }),

  getMany: (resource, params) => {
    const query = {
      id: params.ids
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json,
        total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data)
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id }
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE"
    }).then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE"
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) }))
});
const dataProvider = () => {
  let jsonProvider = (verb, resource, params) => {
    console.log(verb);
    console.log(resource);
    console.log(params);
    let apiUrl = "https://jsonplaceholder.typicode.com";

    return {
      getList: function (resource, params) {
        var _a = params.pagination,
          page = _a.page,
          perPage = _a.perPage;
        var _b = params.sort,
          field = _b.field,
          order = _b.order;
        var query = __assign(
          __assign({}, (0, fetchUtils).flattenObject(params.filter)),
          {
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage
          }
        );
        var url = apiUrl + "/" + resource + "?" + (0, stringify)(query);
        return httpClient(url).then(function (_a) {
          var headers = _a.headers,
            json = _a.json;
          if (!headers.has("x-total-count")) {
            throw new Error(
              "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
            );
          }
          return {
            data: json,
            total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
          };
        });
      },
      getOne: function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id).then(
          function (_a) {
            var json = _a.json;
            return {
              data: json
            };
          }
        );
      },
      getMany: function (resource, params) {
        var query = {
          id: params.ids
        };
        var url = apiUrl + "/" + resource + "?" + (0, stringify)(query);
        return httpClient(url).then(function (_a) {
          var json = _a.json;
          return {
            data: json
          };
        });
      },
      getManyReference: function (resource, params) {
        var _a;
        var _b = params.pagination,
          page = _b.page,
          perPage = _b.perPage;
        var _c = params.sort,
          field = _c.field,
          order = _c.order;
        var query = __assign(
          __assign({}, (0, fetchUtils).flattenObject(params.filter)),
          ((_a = {}),
          (_a[params.target] = params.id),
          (_a._sort = field),
          (_a._order = order),
          (_a._start = (page - 1) * perPage),
          (_a._end = page * perPage),
          _a)
        );
        var url = apiUrl + "/" + resource + "?" + (0, stringify)(query);
        return httpClient(url).then(function (_a) {
          var headers = _a.headers,
            json = _a.json;
          if (!headers.has("x-total-count")) {
            throw new Error(
              "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
            );
          }
          return {
            data: json,
            total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
          };
        });
      },
      update: function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id, {
          method: "PUT",
          body: JSON.stringify(params.data)
        }).then(function (_a) {
          var json = _a.json;
          return {
            data: json
          };
        });
      },
      updateMany: function (resource, params) {
        return Promise.all(
          params.ids.map(function (id) {
            return httpClient(apiUrl + "/" + resource + "/" + id, {
              method: "PUT",
              body: JSON.stringify(params.data)
            });
          })
        ).then(function (responses) {
          return {
            data: responses.map(function (_a) {
              var json = _a.json;
              return json.id;
            })
          };
        });
      },
      create: function (resource, params) {
        return httpClient(apiUrl + "/" + resource, {
          method: "POST",
          body: JSON.stringify(params.data)
        }).then(function (_a) {
          var json = _a.json;
          return {
            data: __assign(__assign({}, params.data), {
              id: json.id
            })
          };
        });
      },
      delete: function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id, {
          method: "DELETE"
        }).then(function (_a) {
          var json = _a.json;
          return {
            data: json
          };
        });
      },
      deleteMany: function (resource, params) {
        return Promise.all(
          params.ids.map(function (id) {
            return httpClient(apiUrl + "/" + resource + "/" + id, {
              method: "DELETE"
            });
          })
        ).then(function (responses) {
          return {
            data: responses.map(function (_a) {
              var json = _a.json;
              return json.id;
            })
          };
        });
      }
    };
  };

  return jsonProvider;
};

// export default dataProvider();
/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
// export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
//   /**
//    * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
//    * @param {String} resource Name of the resource to fetch, e.g. 'posts'
//    * @param {Object} params The data request params, depending on the type
//    * @returns {Object} { url, options } The HTTP request parameters
//    */
//   const convertDataRequestToHTTP = (type, resource, params) => {
//     let url = "";
//     const options = {};
//     switch (type) {
//       case GET_LIST: {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//           ...fetchUtils.flattenObject(params.filter),
//           _sort: field,
//           _order: order,
//           _start: (page - 1) * perPage,
//           _end: page * perPage
//         };
//         url = `${apiUrl}/${resource}?${stringify(query)}`;
//         break;
//       }
//       case GET_ONE:
//         url = `${apiUrl}/${resource}/${params.id}`;
//         break;
//       case GET_MANY_REFERENCE: {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//           ...fetchUtils.flattenObject(params.filter),
//           [params.target]: params.id,
//           _sort: field,
//           _order: order,
//           _start: (page - 1) * perPage,
//           _end: page * perPage
//         };
//         url = `${apiUrl}/${resource}?${stringify(query)}`;
//         break;
//       }
//       case UPDATE:
//         url = `${apiUrl}/${resource}/${params.id}`;
//         options.method = "PUT";
//         options.body = JSON.stringify(params.data);
//         break;
//       case CREATE:
//         url = `${apiUrl}/${resource}`;
//         options.method = "POST";
//         options.body = JSON.stringify(params.data);
//         break;
//       case DELETE:
//         url = `${apiUrl}/${resource}/${params.id}`;
//         options.method = "DELETE";
//         break;
//       case GET_MANY: {
//         const query = {
//           id: params.ids
//         };
//         url = `${apiUrl}/${resource}?${stringify(query)}`;
//         break;
//       }
//       default:
//         throw new Error(`Unsupported fetch action type ${type}`);
//     }
//     return { url, options };
//   };

//   /**
//    * @param {Object} response HTTP response from fetch()
//    * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
//    * @param {String} resource Name of the resource to fetch, e.g. 'posts'
//    * @param {Object} params The data request params, depending on the type
//    * @returns {Object} Data response
//    */
//   const convertHTTPResponse = (response, type, resource, params) => {
//     const { headers, json } = response;
//     switch (type) {
//       case GET_LIST:
//       case GET_MANY_REFERENCE:
//         if (!headers.has("x-total-count")) {
//           throw new Error(
//             "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
//           );
//         }
//         return {
//           data: json,
//           total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
//         };
//       case CREATE:
//         return { data: { ...params.data, id: json.id } };
//       case DELETE_MANY:
//         return { data: json || [] };
//       default:
//         return { data: json };
//     }
//   };

//   /**
//    * @param {string} type Request type, e.g GET_LIST
//    * @param {string} resource Resource name, e.g. "posts"
//    * @param {Object} payload Request parameters. Depends on the request type
//    * @returns {Promise} the Promise for a data response
//    */
//   return (type, resource, params) => {
//     // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
//     if (type === UPDATE_MANY) {
//       return Promise.all(
//         params.ids.map((id) =>
//           httpClient(`${apiUrl}/${resource}/${id}`, {
//             method: "PUT",
//             body: JSON.stringify(params.data)
//           })
//         )
//       ).then((responses) => ({
//         data: responses.map((response) => response.json)
//       }));
//     }
//     // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
//     if (type === DELETE_MANY) {
//       return Promise.all(
//         params.ids.map((id) =>
//           httpClient(`${apiUrl}/${resource}/${id}`, {
//             method: "DELETE"
//           })
//         )
//       ).then((responses) => ({
//         data: responses.map((response) => response.json)
//       }));
//     }
//     const { url, options } = convertDataRequestToHTTP(type, resource, params);
//     return httpClient(url, options).then((response) =>
//       convertHTTPResponse(response, type, resource, params)
//     );
//   };
// };
