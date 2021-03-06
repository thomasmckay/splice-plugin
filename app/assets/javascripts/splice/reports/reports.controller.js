/**
 * Copyright 2013-2014 Red Hat, Inc.
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
 * @name  Splice.reports.controller:ReportsController
 *
 * @requires $scope
 * @requires $location
 * @requires gettext
 * @requires Nutupane
 * @requires Report
 * @requires CurrentOrganization
 *
 * @description
 *   Provides the functionality specific to activation keys for use with the Nutupane UI pattern.
 *   Defines the columns to display and the transform function for how to generate each row
 *   within the table.
 */
angular.module('Splice.reports').controller('ReportsController',
    ['$scope', '$location', 'gettext', 'Nutupane', 'Report', 'CurrentOrganization',
    function ($scope, $location, gettext, Nutupane, Report, CurrentOrganization) {

        var params = {
            'organization_id':  CurrentOrganization,
            'search':           $location.search().search || "",
            'sort_by':          'name',
            'sort_order':       'ASC',
            'paged':            true
        };

        var nutupane = new Nutupane(Report, params);
        $scope.table = nutupane.table;
        $scope.removeRow = nutupane.removeRow;

        $scope.table.closeItem = function () {
            $scope.transitionTo('reports.index');
        };

        $scope.formatNamesList = function (namesList) {
            return _.pluck(namesList, 'name').join(",");
        };

    }]
);
