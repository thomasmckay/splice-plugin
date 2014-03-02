/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 */

/**
 * @ngdoc object
 * @name  Splice.reports.controller:ReportAddOperatingSystemsController
 *
 * @requires $scope
 * @requires $q
 * @requires $location
 * @requires gettext
 * @requires Report
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for adding operating systems to an report.
 */
angular.module('Splice.reports').controller('ReportAddOperatingSystemsController',
    ['$scope', '$q', '$location', 'gettext', 'Report', 'Nutupane',
    function ($scope, $q, $location, gettext, Report, Nutupane) {
        var operatingSystemsPane, params;

        $scope.successMessages = [];
        $scope.errorMessages = [];

        params = {
            'search':      $location.search().search || "",
            'sort_by':     'name',
            'sort_order':  'ASC',
            'paged':       true,
            'id':          $scope.$stateParams.reportId
        };

        operatingSystemsPane = new Nutupane(Report, params, 'availableOperatingSystems');
        $scope.operatingSystemsTable = operatingSystemsPane.table;

        $scope.addOperatingSystems = function () {
            var data,
                success,
                error,
                deferred = $q.defer(),
                operatingSystemsToAdd = _.pluck($scope.operatingSystemsTable.getSelected(), 'id');

            data = {
                "activation_key": {
                    "system_group_ids": operatingSystemsToAdd
                }
            };

            success = function (data) {
                $scope.successMessages = [gettext('Added %x system groups to system "%y".')
                    .replace('%x', $scope.operatingSystemsTable.numSelected)
                    .replace('%y', $scope.report.name)];
                $scope.operatingSystemsTable.working = false;
                $scope.operatingSystemsTable.selectAll(false);
                operatingSystemsPane.refresh();
                $scope.report.$get();
                deferred.resolve(data);
            };

            error = function (error) {
                deferred.reject(error.data.errors);
                $scope.errorMessages = error.data.errors['base'];
                $scope.operatingSystemsTable.working = false;
            };

            $scope.operatingSystemsTable.working = true;
            Report.addOperatingSystems({id: $scope.report.id}, data, success, error);
            return deferred.promise;
        };
    }]
);
