import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Arrays to store users and filtered users
  users: any[] = [];
  filteredUsers: any[] = [];
  showSpinner = false;

  // Current page and search criteria
  currentPage = 1;
  searchUserId: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Load users for the initial page (pages 1 and 2)
    this.loadUsers(this.currentPage);
  }

  // Function to load users for a given page (pages 1 and 2 only)
  loadUsers(page: number) {
    this.showSpinner = true;

    // Ensure the page number is valid (pages 1 and 2 only)
    if (page !== 1 && page !== 2) {
      this.showSpinner = false;
      return;
    }

    // Update the current page
    this.currentPage = page;

    setTimeout(() => {
      this.userService.getUsers(this.currentPage).subscribe(
        // Successful response callback
        (response: any) => {
          // Assign fetched user data to the 'users' array
          this.users = response.data;

          // Apply the search filter to update the 'filteredUsers' array
          this.applySearchFilter();

          // Log user data to the console
          console.log(this.users);
        },
        // Error callback
        (error) => {
          console.error('Error fetching users:', error);
        },
        // Completion callback
        () => {
          console.log('User data fetched successfully.');
          this.showSpinner = false;
        }
      );
    }, 3000);
    // Call the UserService to fetch users for the specified page
  }

  // Function to navigate to user details page
  navigateToUserDetails(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  // Function to handle user search
  searchUser() {
    this.applySearchFilter();
  }

  // Function to apply search filter to the 'filteredUsers' array
  applySearchFilter() {
    if (this.searchUserId === null) {
      // If search criteria is null, display all users
      this.filteredUsers = this.users;
    } else {
      // If search criteria is not null, filter users by ID
      this.filteredUsers = this.users.filter(user => user.id === this.searchUserId);
    }
  }
}
