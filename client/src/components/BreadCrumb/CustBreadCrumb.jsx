"use client";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import pageTitles from "../../routes/PageTitles";

const generatePathWithParams = (path, params) => {
  let generatedPath = path;
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value !== undefined) {
        const stringValue = Array.isArray(value) ? value[0] : value;
        generatedPath = generatedPath.replace(`:${key}`, stringValue);
      }
    }
  }
  return generatedPath;
};

const matchPath = (pattern, pathname) => {
  const regexPattern = pattern
    .replace(/\[([^\]]+)\]/g, '([^/]+)')
    .replace(/:([^/]+)/g, '([^/]+)');

  const regex = new RegExp(`^${regexPattern}$`);
  const match = pathname.match(regex);

  if (!match) return null;

  const paramNames = [];
  const bracketParams = pattern.match(/\[([^\]]+)\]/g);
  const colonParams = pattern.match(/:([^/]+)/g);

  if (bracketParams) {
    bracketParams.forEach((param) => paramNames.push(param.slice(1, -1)));
  }
  if (colonParams) {
    colonParams.forEach((param) => paramNames.push(param.slice(1)));
  }

  const params = {};
  paramNames.forEach((name, index) => {
    if (match[index + 1]) params[name] = match[index + 1];
  });

  return { params };
};

const CustBreadCrumb = () => {
const location = useLocation();
const pathname = location.pathname;
  const currentParams = useParams();
  let foundBreadcrumbConfig = null;
  let activeMatchParams = currentParams;

  for (const pathPattern in pageTitles) {
    if (Object.prototype.hasOwnProperty.call(pageTitles, pathPattern)) {
      const match = matchPath(pathPattern, pathname);
      if (match) {
        foundBreadcrumbConfig = pageTitles[pathPattern];
        activeMatchParams = { ...currentParams, ...match.params };
        break;
      }
    }
  }

  const config = foundBreadcrumbConfig || { title: pathname, breadcrumbs: [] };
  const breadcrumbsToRender = config.breadcrumbs || [];

  return (
    <div className="w-full">
      {breadcrumbsToRender.length > 0 && (
        <div className="flex items-center space-x-2 border-0 border-l-4 border-blue-600 !border-solid pl-4 rounded-md my-4 text-[1rem]">
          {breadcrumbsToRender.map((crumb, index) => {
            const populatedPath = crumb.path ? generatePathWithParams(crumb.path, activeMatchParams) : undefined;
            return (
              <React.Fragment key={index}>
                <span className="flex items-center">
                  {populatedPath ? (
                    <Link to={populatedPath} className="no-underline text-gray-600 hover:text-blue-700">
                      <p className="text-blue-600">{crumb.name}</p>
                    </Link>
                  ) : (
                    <p className="text-gray-700">{crumb.name}</p>
                  )}
                </span>
                {index < breadcrumbsToRender.length - 1 && (
                  <span className="mx-2 flex justify-center items-center">
                    <i className="pi pi-angle-double-right" style={{ fontSize: "1rem", marginTop: "2px" }}></i>
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustBreadCrumb;
