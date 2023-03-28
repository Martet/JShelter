/** \file
 * \brief Code that handles NBS options specific to Firefox
 *
 *  \author Copyright (C) 2023  Libor Polcak
 *
 *  \license SPDX-License-Identifier: GPL-3.0-or-later
 */
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

var fragment = document.createRange().createContextualFragment(`
		<p class="alert">Network Boundary Shield is not active if you are using HTTP proxy to prevent DNS leaks of your queries initiated from this computer.</p>
			 `);
var nbs_fieldset = document.querySelector("#proxy-protection-config fieldset");
nbs_fieldset.parentNode.insertBefore(fragment, nbs_fieldset);