/**
 * Copyright 2013-2014 Red Hat, Inc.

 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc factory
 * @name  Splice.reports.factory:Report
 *
 * @requires $resource
 *
 * @description
 *   Provides a $resource for activation keys.
 */
angular.module('Splice.reports').factory('Report',
    ['$resource', function ($resource) {
        return $resource('/../splice/api/reports/:id/:action/:action2', {id: '@id'}, {
            get: {method: 'GET', params: {fields: 'full'}},
            query: {method: 'GET', isArray: false},
            update: {method: 'PUT'},
            operatingSystems: {method: 'GET',
                        transformResponse: function (data) {
                            var report = angular.fromJson(data);
                            return {results: report.operatingsystems};
                        }
            },
            xavailableOperatingSystems: {method: 'GET', params: {action: 'operating_systems', action2: 'available'}},
            availableOperatingSystems: {method: 'GET', url: '/../api/v2/operatingsystems',
                        transformResponse: function (data) {
                            var results = angular.fromJson(data);
                            return {results: results.results};
                        }
            },
            removeOperatingSystems: {method: 'PUT', isArray: false, params: {action: 'operating_systems'}},
            addOperatingSystems: {method: 'POST', isArray: false, params: {action: 'operating_systems'}},
        });
    }]
);
