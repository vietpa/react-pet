import { getClazz, getJsonProperty } from "../decorators/json-property";

export class MapUtils {
  static isPrimitive(obj: any): any {
    switch (typeof obj) {
      case "string":
      case "number":
      case "boolean":
        return true;
    }
    return !!(
      obj instanceof String ||
      obj === String ||
      obj instanceof Number ||
      obj === Number ||
      obj instanceof Boolean ||
      obj === Boolean
    );
  }

  static isArray(object: any): any {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === "function") {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }

  static serialize<T>(obj: T | any): any {
    if (obj === undefined) {
      return undefined;
    }
    const jsonObject: any = {};
    Object.keys(obj).forEach((key: string) => {
      const propertyMetadataFn: (IJsonMetaData: any) => any = () => {
        const propertyName = key;
        const innerJson = obj ? obj[propertyName] : undefined;
        const cls = getClazz(obj, key);
        if (MapUtils.isArray(cls)) {
          const metadata = getJsonProperty(obj, key);
          if (metadata.clazz || MapUtils.isPrimitive(cls)) {
            if (innerJson && MapUtils.isArray(innerJson)) {
              return innerJson.map((item: any) => MapUtils.serialize(item));
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }
        } else if (!MapUtils.isPrimitive(cls)) {
          return MapUtils.serialize(innerJson);
        } else {
          return obj ? obj[propertyName] : undefined;
        }
      };

      const propMetadata: any = getJsonProperty(obj, key);
      if (propMetadata) {
        jsonObject[propMetadata.name] = propertyMetadataFn(propMetadata);
      } else {
        if (obj && obj[key] !== undefined) {
          jsonObject[key] = obj[key];
        }
      }
    });
    return jsonObject;
  }

  static deserialize<T>(clazz: new () => T, jsonObject: any): any {
    if (clazz === undefined || jsonObject === undefined) {
      return undefined;
    }
    const obj: any = new clazz();
    Object.keys(obj).forEach((key) => {
      const propertyMetadataFn: (IJsonMetaData: any) => any = (
        propertyMetadata
      ) => {
        const propertyName = propertyMetadata.name || key;
        const innerJson = jsonObject ? jsonObject[propertyName] : undefined;
        const cls = getClazz(obj, key);
        if (MapUtils.isArray(cls)) {
          const metadata: any = getJsonProperty(obj, key);
          if (metadata.clazz || MapUtils.isPrimitive(cls)) {
            if (innerJson && MapUtils.isArray(innerJson)) {
              return innerJson.map((item: any) =>
                MapUtils.deserialize(metadata.clazz, item)
              );
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }
        } else if (!MapUtils.isPrimitive(cls)) {
          return MapUtils.deserialize(cls, innerJson);
        } else {
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      const propMetadata = getJsonProperty(obj, key);
      if (propMetadata) {
        obj[key] = propertyMetadataFn(propMetadata);
      } else {
        if (jsonObject && jsonObject[key] !== undefined) {
          obj[key] = jsonObject[key];
        }
      }
    });
    return obj;
  }
}
