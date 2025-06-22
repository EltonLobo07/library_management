# Copyright (c) 2025, Elton Lobo and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class LibraryMember(Document):
	def before_save(self):
		is_last_name_present = len(self.last_name or '') > 0
		self.full_name = f'{self.first_name}{" " if is_last_name_present else ""}{self.last_name}'
