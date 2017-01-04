yashible.<%= name %>
<%= Array(name.length).join('=') %>

<%= description %>

Requirements
------------

None.

Role Variables
--------------

None.

Dependencies
------------

None.

Example Playbook
----------------

    - hosts: servers
      roles:
         - { role: yashible.<%= name %> }

License
-------

MIT
