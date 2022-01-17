const $ = (tag, attrs = {}, ...children) => {

  const e = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "style") {
      Object.entries(value).forEach(([cssKey, cssValue]) => 
        e.style[cssKey] = cssValue);
    } else if (key.startsWith("on")) {
      e.addEventListener(key.substring(2), value);
    } else {
      e[key] = value;
    }

  });

  children.forEach(child => e.append(child));
  return e;
}